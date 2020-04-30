const colors = require("colors/safe");
const bundle = global.__bundle;
const dbClass = require("sap-hdbext-promisfied");

exports.command = 'adminHDI [user] [password]';
exports.aliases = ['adHDI', 'adhdi'];
exports.describe = bundle.getText("adminHDI");


exports.builder = {
  admin: {
    alias: ['a', 'Admin'],
    type: 'boolean',
    default: true,
    desc: bundle.getText("admin")
  },
  user: {
    alias: ['u', 'User'],
    desc: bundle.getText("user")
  },
  password: {
    alias: ['p', 'Password'],
    desc: bundle.getText("password")
  },
};

exports.handler = function (argv) {
  const prompt = require('prompt');
  prompt.override = argv;
  prompt.message = colors.green(bundle.getText("input"));
  prompt.start();

  var schema = {
    properties: {
      admin: {
        description: bundle.getText("admin"),
        type: 'boolean',
        required: true,
        ask: () => {
          return false;
        }
      },
      user: {
        description: bundle.getText("user"),
        required: true
      },
      password: {
        description: bundle.getText("password"),
        hidden: true,
        replace: '*',
        required: true
      }
    }
  };

  prompt.get(schema, (err, result) => {
    if (err) {
      return console.log(err.message);
    }
    global.startSpinner()
    activate(result);
  });
}


async function activate(result) {
  const dbStatus = new dbClass(await dbClass.createConnectionFromEnv(dbClass.resolveEnv(result)));
  
  let results = await dbStatus.execSQL(`CREATE USER ${result.user} PASSWORD "${result.password}" NO FORCE_FIRST_PASSWORD_CHANGE;`);
  console.table(results);

  let resultsGrant = await dbStatus.execSQL(
    `CREATE LOCAL TEMPORARY TABLE #PRIVILEGES LIKE _SYS_DI.TT_API_PRIVILEGES;`);
  console.table(resultsGrant);
  resultsGrant = await dbStatus.execSQL(
    `INSERT INTO #PRIVILEGES (PRINCIPAL_NAME, PRIVILEGE_NAME, OBJECT_NAME) SELECT 'SYSTEM', PRIVILEGE_NAME, OBJECT_NAME FROM _SYS_DI.T_DEFAULT_DI_ADMIN_PRIVILEGES;`);
  console.table(resultsGrant);
  resultsGrant = await dbStatus.execSQL(
    `INSERT INTO #PRIVILEGES (PRINCIPAL_NAME, PRIVILEGE_NAME, OBJECT_NAME) SELECT '${result.user}', PRIVILEGE_NAME, OBJECT_NAME FROM _SYS_DI.T_DEFAULT_DI_ADMIN_PRIVILEGES;`);
  console.table(resultsGrant);
  resultsGrant = await dbStatus.execSQL(
    `CALL _SYS_DI.GRANT_CONTAINER_GROUP_API_PRIVILEGES('_SYS_DI', #PRIVILEGES, _SYS_DI.T_NO_PARAMETERS, ?, ?, ?);`);
  console.table(resultsGrant);
  resultsGrant = await dbStatus.execSQL(
    `DROP TABLE #PRIVILEGES;`);
  console.table(resultsGrant);
  global.__spinner.stop()
  return;
}