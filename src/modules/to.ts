
function to<T>(promise: Promise<T>): Promise<[Error, undefined] | [undefined | T]> {
    return promise
        .then((res) => {
            //if (!res.data.success) return [`The following request was unsuccessful: ${res.metadata.url}`];

            return [undefined, res];
        })
        .catch((err: Error) => [err, undefined]);
}

export default to;

const promise = new Promise((resolve, reject) => {
    resolve(123);
});