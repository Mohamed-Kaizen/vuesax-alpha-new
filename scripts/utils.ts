import path from "node:path"
import fs from "fs-extra"
import fg from "fast-glob"

import { fileURLToPath as file_url_to_path } from "node:url"

const currentPath = path.dirname(file_url_to_path(import.meta.url))

export const DIR_ROOT = path.resolve(currentPath, "../")

export const DIR_SRC = path.resolve(DIR_ROOT, "src")

export const DIR_COMPONENTS = path.resolve(DIR_SRC, "components")

export const DIR_COMPOSABLES = path.resolve(DIR_SRC, "composables")

/**
 * Get all the components in the components directory
 */
export async function get_components() {
    return await fg("*", {
		onlyDirectories: true,
		cwd: DIR_COMPONENTS,
	})

}

export async function get_composables() {
	return await fg("*", {
		onlyDirectories: true,
		cwd: DIR_COMPOSABLES,
	})
}

/**
 * Capitalize the first letter of a string
 */
export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
