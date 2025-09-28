module.exports = (fu)=>{
    return (req,res,next)=>{
        try {
            const result = fu(req,res,next);
            if (result && typeof result.catch === 'function') {
                // If it's a promise, add error handling
                result.catch(next);
            }
            return result;
        } catch (err) {
            // Handle synchronous errors
            next(err);
        }
    };
};