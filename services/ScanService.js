import axios from "axios";

const scanUrl = "http://192.168.100.212:8080/scan/scanProduct";

const baseUrl = "http://192.168.100.212:8080/scan";

class ScanService {

    // getPersons(){
    //     return axios.get(baseUrl);
    // }

    // createPerson(person){
    //     return axios.post(baseUrl,person);
    // }

    // getPersonById(id){ 
    //     return axios.get(baseUrl, id);
    // }

    // deletePerson(id){
    //     return axios.delete(baseUrl + '/' +id);
    // }

    // scanItem(details ){
    //     return axios.post(scanUrl, details );
    // }

    // async scanItem (barid ) {
    //     return axios
    //          .post(baseUrl + "scanProduct", {
    //            headers: { "Content-Type": "application/json; charset=UTF-8" },
    //            params: { userid: 'spencerrobles19',barid:barid }, //Add mail as a param
    //          })
    //          .then((response) => console.log("repsonse", response.status)); 
    //    }
}

export default new ScanService;