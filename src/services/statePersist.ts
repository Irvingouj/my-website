export function presist_state<T> (data:T,name:string){    
    localStorage.setItem(name,JSON.stringify(data));
}

export function get_state<T> (name:string):T{
    return JSON.parse(localStorage.getItem(name)||"{}");
}