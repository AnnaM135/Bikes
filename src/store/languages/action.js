import constants from "./const"


export function changeData(langId){
    return{
        type: constants.CHANGE_LANG_ID,
        value: langId
    }
}