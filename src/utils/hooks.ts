import { useEffect, useRef } from "react";

type Func<T> = (value:T|undefined) => void ;

export const usePrevious= <T>(value:T,effect:Func<T>) =>{
    const ref = useRef<T>();
    useEffect(() => {
        effect(ref.current);
        ref.current = JSON.parse(JSON.stringify(value));  
    }, [value]);
}


type Effect = () => void | (() => void);

export const useEffectIf = <T>(condition:any, effect:Effect, arr:[T]) =>{
    useEffect(() => {
        if(condition){
            effect();
        }
    }, arr);
}