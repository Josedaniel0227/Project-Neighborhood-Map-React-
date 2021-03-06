/*
* A Special Thanks To Forrest Walker for its amazing walkthrough https://www.youtube.com/watch?v=Dj5hzKBxCBI&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP&index=3
*/

class Helper {
  static baseURL() {
    return "https://api.foursquare.com/v2";
  }
  static auth() {
    const keys = {
      client_id: "XEQCMYPEO1DXENH4KWDPLDH4UQD23OB5AEVQ5PBUT1XGQC1U",
      client_secret: "DYFNRAVZZLOT3MYJNZ21H5JL135STKXOWBPXI2UBOFNHSXFU",
      v:"20181010",
    };
		return Object.keys(keys).map(key => `${key}=${keys[key]}`)
		.join("&");
	}

	static urlBuilder(urlPrams){
		if(!urlPrams){
			return ""
		}

		return Object.keys(urlPrams)
			.map(key => `${key}=${urlPrams[key]}`)
			.join("&");
	}

	static headers() {
		return {
			Accept: "application/json"
		};
	}

	static simpleFetch(endPoint, method, urlPrams){
		let requestData = {
			method,
			headers: Helper.headers()
		};
		return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlPrams)}`,
			requestData
			).then(res => res.json());

	}
}

export default class SquareAPI {
	static search(urlPrams) {
		return Helper.simpleFetch("/venues/search", "GET", urlPrams);
	}

	static getVenueDetails(VENUE_ID){
		return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
	}

	static getVenuePhotos(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
	}
}
