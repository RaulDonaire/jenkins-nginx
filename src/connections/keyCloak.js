import axios from 'axios';

const keyCloak= axios.create({
    baseURL: "http://localhost:8070/IAM",
    //baseURL: "http://localhost:8180/auth/realms/teste/protocol/openid-connect/token"
    //baseURL: "http://keycloak-flex-foward-portal-poc.orion9.icarotech.com/auth/realms/realm-test/protocol/openid-connect/token"
})

export default keyCloak;