// @ts-check
import * as base from '../utils/base.js'
import * as schemas from './schemas.js'

export const command = 'schemasUI [schema]'
export const aliases = ['schui', 'getSchemasUI', 'listSchemasUI', 'schemasui', 'getschemasui', 'listschemasui']
export const describe = schemas.describe 

export const builder = schemas.builder

export function handler (argv) {
  base.promptHandler(argv, getSchemas, schemas.inputPrompts)
}

export async function getSchemas(prompts) {
  base.debug('getSchemasUI')
  try {
    base.setPrompts(prompts)
    await base.webServerSetup('/ui/#schemas-ui')
    return base.end()
  } catch (error) {
    base.error(error)
  }
}
