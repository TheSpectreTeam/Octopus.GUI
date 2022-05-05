export const compose = (...fns: Function[]) =>
    (args: any, ...restArgs: any) => {
        if (fns.length <= 0) throw new Error('No functions passed!')
        return fns.reduceRight((acc: any, fn: Function) => {
            return fn.apply(null, [acc, ...restArgs])
        },
            args)
    }


