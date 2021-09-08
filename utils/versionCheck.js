// @ts-check
import * as base from './base.js'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const check = require('check-node-version')
import 'colors'

export function checkVersion() {
    return new Promise(resolve => {

        const version = require("../package.json").engines.node
        base.debug(base.bundle.getText('requestedVersion', [version]))
        check({ node: version },
            (error, results) => {
                if (error) {
                    base.error(error)
                    resolve()
                }
                base.debug(results)
                if (results.isSatisfied) {
                    resolve()
                }

                for (const packageName of Object.keys(results.versions)) {
                    if (!results.versions[packageName].isSatisfied) {
                        base.error(
                            `${ base.bundle.getText('warning').red} ${base.bundle.getText('versionCheckFail', [results.versions[packageName].wanted, results.versions[packageName].version])}`)
                    }
                }
                resolve()
            })
    })
}
