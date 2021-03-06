// @ts-check
import * as base from '../utils/base.js'

export const command = 'systemInfoUI'
export const aliases = ['sysUI', 'sysinfoui', 'sysInfoUI', 'systeminfoui']
export const describe = base.bundle.getText("systemInfoUI")
export const builder = base.getBuilder({})
export function handler (argv) {
  base.promptHandler(argv, sysInfo, {})
}

export async function sysInfo(prompts) {
  base.debug('sysInfoUI')
  try {
    base.setPrompts(prompts)
    await base.webServerSetup('/ui/#systeminfo-ui')
    return base.end()
  } catch (error) {
    base.error(error)
  }

}