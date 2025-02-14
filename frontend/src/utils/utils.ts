/**
 * キャメルケースをスネークケースに変換する関数
 * @param str - キャメルケースの文字列
 * @returns スネークケースに変換された文字列
 */
export const toSnakeCase = (str: string): string => {
    return str.replace(/([A-Z])/g, "_$1").toLowerCase();
};

/**
 * オブジェクトのキーをキャメルケースからスネークケースに変換する関数
 * @param obj - オブジェクト
 * @returns キーがスネークケースに変換されたオブジェクト
 */
export const convertKeysToSnakeCase = (obj: Record<string, string>): Record<string, string> => {
    const snakeCaseObj: Record<string, string> = {};
    for (const key in obj) {
        snakeCaseObj[toSnakeCase(key)] = obj[key];
    }
    return snakeCaseObj;
};