const compose = (...funcs) => (comp) => {
    return funcs.reduceRight((prevResult, elFunc) => elFunc(prevResult), comp);
};

export default compose;