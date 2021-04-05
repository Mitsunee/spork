let fetchHeader, fetchInit;

// Header for forceReload option
fetchHeader = new Headers();
fetchHeader.append("pragma", "no-cache");
fetchHeader.append("cache-control", "no-cache");
fetchInit = {
  method: "GET",
  headers: fetchHeader
};

/*
 * function fetchJson
 *
 * Asynchronous wrapper function for fetch that automatically parses received json data into an object
 *
 * String url - the url to fetch
 * Object|Boolean option (optional) - either your custom init, "forceReload" for the provided forceReload header or false
 *
 * returns Object (potentially Array) or false if something went wrong (see error in console)
 */
async function fetchJson(url, option) {
  let response;
  try {
    if (option === "forceReload") {
      response = await fetch(url, fetchInit);
    } else if (typeof option === "object") {
      response = await fetch(url, option);
    } else {
      response = await fetch(url);
    }
    return await response.json();
  } catch (e) {
    console.error(`Error while fetching: ${e}`);
    return false;
  }
}

export default fetchJson;
