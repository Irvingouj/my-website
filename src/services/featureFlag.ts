export enum featureFlag{
    blog = "blog",
}

export function isFeatureENabled(feature:featureFlag){
    switch(feature){
        case featureFlag.blog:
            return false;
        default:
            return false;
    }
}