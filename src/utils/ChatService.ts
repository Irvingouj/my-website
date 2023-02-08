export const getResponse = async (message: string) => {
    return new Promise(resolve => {
        const data = [
          {
            value: 10000000
          },
        ];
        setTimeout(() => {
          resolve(data);
        }, 10);
      });
}