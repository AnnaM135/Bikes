let initState = {
    card: []
}

export default function basketReducer(state = initState, action) { 
    switch(action.type){
        case "changeCard":return{
            user: action.value
        }
    }
    return state
}