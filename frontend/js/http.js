const xhr = new XMLHttpRequest(),
  backendURL = 'https://94wrfe-3000.preview.csb.app';
// backendURL = 'http://localhost:3000';

export let sportData = 0;

export const loadData = () => {
  xhr.open('GET', `${backendURL}/load`);
  xhr.onload = () => {
    console.log(JSON.parse(xhr.responseText).data);
    return (sportData = JSON.parse(xhr.responseText).data);
  };
  xhr.send();
};

export const saveData = () => {
  xhr.open('PUT', `${backendURL}/save`);
  // xhr.withCredentials = true;
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log('Succesful save.');
    } else {
      console.log(`${xhr.status}: ${xhr.response}`);
    }
  };

  // console.log(JSON.stringify({ data: sportData }));
  xhr.send(JSON.stringify({ data: sportData }));

  // `{"data":${JSON.stringify(sportData)}}`;
  // console.log(`{"data":${JSON.stringify(sportData)}}`);
};

loadData();
// setTimeout(() => {
//   console.log(`{"data":${JSON.stringify(sportData)}}`);
// }, 1000);
