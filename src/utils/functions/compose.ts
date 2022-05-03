export const compose = (...fns: any) =>
    (args: any, ...restArgs: any) => {
        const fnsToExecute = fns.filter((fn: any) => typeof fn === 'function')
        if (fnsToExecute.length !== fns.length) console.warn('Some arguments was deleted, because this is not function')
        if (fnsToExecute.length <= 0) throw new Error('No functions passed!')
        return fnsToExecute.reduceRight((acc: any, fn: any) => {
            return fn.apply(null, [acc, ...restArgs])
        },
            args)
    }


