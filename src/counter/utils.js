const transitionended = (element) => {
    return new Promise((resolve) => {
        if (!element) {
            console.error('Invalid element passed to transitionended.');
            resolve(); // Resolve immediately if the element is invalid
            return;
        }

        const onTransitionEnd = (event) => {
            if (event.target === element) {
                element.removeEventListener('transitionend', onTransitionEnd);
                resolve(); // Resolve the promise when transition ends
            }
        };

        element.addEventListener('transitionend', onTransitionEnd);
    });
};

async function changeStates(element, maxDistance, isAdd){
    if(!element || isAdd === null){
        console.error('Please provide a valid element and a boolean value for isAdd');
    }

    if(isAdd){
        element.style.tranition = 'top 0.5 ease';
        element.style.top = '0px';
        element.offsetHeight;
        element.style.top = `-${maxDistance}px`
        await transitionended(element);
        element.style.tranition = 'top 0.5 cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        element.style.top = `-${maxDistance}px`
        element.offsetHeight;
    } else {
        element.style.tranition = 'top 0.5 ease';
        element.style.top = '0px';
        element.offsetHeight;
        element.style.top = `${maxDistance}px`
        await transitionended(element);
        element.style.tranition = 'top 0.5 cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        element.style.top = `${maxDistance}px`
        element.offsetHeight;
    }

    element.style.top = '0px';

}

export {
    transitionended,
    changeStates
}