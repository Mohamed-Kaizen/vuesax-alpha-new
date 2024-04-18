import fs from "fs-extra"
import { DIR_COMPONENTS, DIR_COMPOSABLES, get_components, get_composables, capitalize } from "./utils"

async function run() {
    const components = await get_components()

    const composables = await get_composables()

    const imports: string[] = []
    
    const exports: string[] = []

    const composableImports: string[] = []

    for (const component of components) {
        const name = `Vs${capitalize(component)}`
        imports.push(`import ${name} from "./${component}/index.vue"`)
        exports.push(name)
    }
    
    for (const composable of composables) {
        composableImports.push(`export * from "./${composable}"`)
    }

    const output = `
// Please do not touch this file. It will be automatically updated.
${imports.join('\n')}

export {
  ${exports.join(',\n  ')}
}
`

const composableOutput = `
// Please do not touch this file. It will be automatically updated.
${composableImports.join('\n')}
`

    await fs.writeFile(`${DIR_COMPONENTS}/index.ts`, output)

    await fs.writeFile(`${DIR_COMPOSABLES}/index.ts`, composableOutput)

}

run()