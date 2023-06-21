export const thumbs = {
    hidden: {opacity:0 , scale:0} ,
    visible: (index)=>({
        opacity: 1 ,
        scale: 1 ,
        transition:{
            duration:0.2 ,
            delay: 0.001 + index*0.1
        }
    })
}