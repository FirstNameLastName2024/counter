
import { useState, useRef, useEffect, useCallback } from 'react'
import classes from './counter.module.css'
import { changeStates } from './utils';

function Counter() {
  // variables that store a pointer to dom element: display_counter, and stores a count state
  const containerNode = useRef(null);
  const [data, setData] = useState(0);
  let added = false;
  const countState = useRef({
    old: 0,
    new: 0
  })


    useEffect(() => {
      const parentContainer = containerNode.current.parentElement
      const maxDistance = (parentContainer.clientHeight - containerNode.current.clientHeight) / 2;
      let transitionActive = false

      containerNode.current.onmousedown = function(mouseEvent1){
        // IF there is an active transtion 
        if(transitionActive) removeMouseMove();
        
        let startPoint = mouseEvent1.y;
        let oldDistance = 0;

        containerNode.current.onmousemove = async function(mouseEvent2){
          // current distance
          let currentDistance = mouseEvent2.y - startPoint;
          
          if(!added){
            if(currentDistance < oldDistance){ // Mouse is going up
              countState.current = {
                old: countState.current.new,
                new: countState.current.new + 1
              }
  
              added = true
  
            } else if(currentDistance > oldDistance) {  // Mouse is going down
              countState.current = {
                old: countState.current.new,
                new: Math.max(countState.current.new - 1, 0) 
              }  
              added = true
            }

          } else removeMouseMove();
          oldDistance = currentDistance;
        } 
        
        // Remove the mouseMove if the mouse goes out of the target, or mouse up

        containerNode.current.ontransitionend = function () {
          transitionActive = false;     
        }

        const removeMouseMove = () => containerNode.current.onmousemove = null;
        containerNode.current.onmouseleave = () => removeMouseMove();
        containerNode.current.onmouseup = () => {
          if(countState.current.old < countState.current.new) { 
            transitionActive = true;
            changeStates(containerNode.current, maxDistance, true);
          } else if (countState.current.old > countState.current.new) { 
            transitionActive = true;
            changeStates(containerNode.current, maxDistance,false);
          }

          added = false
          setData(countState.current.new)
          removeMouseMove()
        };
      }


      // Garbage collection
      return () => {
        containerNode.current.onmousedown = null;
        containerNode.current.onmouseup = null;
        containerNode.current.onmouseleave = null;
        containerNode.current.onmousemove = null;

      }

    }, [])

  return (  
    <div className={classes.counter_container}>
        <div><i className={[classes.arrow, classes.up].join(" ")}></i></div>
        <div className={classes.display_counter} ref={containerNode}><p>{data}</p></div>
        <div><i className={[classes.arrow, classes.down].join(" ")}></i></div>
    </div>
  );
}

export default Counter
