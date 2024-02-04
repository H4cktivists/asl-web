import "./progressbar.css";
import { useRef,useEffect } from "react";
import {motion,animate} from 'framer-motion';
const Progressbar=({value})=>
{
    // const progressTextRef=useRef(null);
    // useEffect(()=>{
    //     const progressText=progressTextRef.current?.textContent;
    //     if(progressTextRef.current != null){
    //         animate(parseInt(progressText),value,{
    //             duration:0.5,
    //             onUpdate:(cv)=>{
    //                 progressTextRef.current.textContent=cv.tofixed(0)
    //             }
    //         });
    //     }
    // },[value]);

   
    return(
        <div className="progressbar-container">
            <div className="progressbar">
                <motion.div 
                className="bar" 
                animate={{
                    width: `${value}%`
                }}
                transition={{
                    duration:0.5
                }}
                />
            </div>
            <div className="progressbar-text-container">
                <p >0</p>
                <p>Match % </p>
            </div>
        
        </div>
    )
};

export default Progressbar;