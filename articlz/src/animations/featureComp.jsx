export const cardView = {
    hidden: { x:200 } ,
    visible: (index)=>({
      x:0 ,
      transition:{
        duration: 0.3 + index
      }
    }) ,
    hover:{
      scale:1.2
    }
  }