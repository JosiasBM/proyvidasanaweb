import { CognitoUserPool} from "amazon-cognito-identity-js";

const poolData={
    UserPoolId: "us-east-1_OJo9kXGfp",
    ClientId: "2iidbtpg00cku2n329hiba9k2d"
}

export default new CognitoUserPool(poolData);