export const HANDLE_SUBMIT = "HANDLE_SUBMIT";
export const HANDLE_USERNAME = "HANDLE_CHANGE";
export const HANDLE_MSG = "HANDLE_MSG";
export const CLEAR_MSG = "CLEAR_MSG";
export const PUSH_MSG = "PUSH_MSG";

export const handleSubmit = (event) => {
  //event.preventDefault(); - ne treba?
  let username = document.getElementById("username").value;
  return { type: HANDLE_SUBMIT, payload: username };
};

export const handleUsername = () => {
  let username = document.getElementById("username").value;
  return { type: HANDLE_USERNAME, payload: username };
};

export const handleMsgChange = () => {
  let msg = document.getElementById("msg").value;
  return { type: HANDLE_MSG, payload: msg };
};

export const clearMsg = () => {
  return { type: CLEAR_MSG };
};

export const pushMsg = (newMsg) => {
  return { type: PUSH_MSG, payload: newMsg };
};

/*export const osvjeziFilmove = () => async (dispatch) => {
  //u ovim zagradama pišemo bilo što asinkrono, do tu je sve špranca
  let dohvaceniFilmovi = await fetch(
    `https://api.tvmaze.com/search/shows?q=star`
  ).then((response) =>
    response.json().then((data) => {
      return data;
    })
  );
  dispatch({ type: OSVJEZI_FILMOVE, payload: dohvaceniFilmovi }); //ovo obavezno na kraju za pokretanje promjene stanja
};
*/
