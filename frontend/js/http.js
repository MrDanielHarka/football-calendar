const xhr = new XMLHttpRequest();

export let sportData = 0;

export const loadData = () => {
  // xhr.open('GET', 'https://94wrfe-3000.preview.csb.app/load');
  xhr.open('GET', 'http://localhost:3000/load');
  xhr.onload = () => {
    console.log(JSON.parse(xhr.responseText).data);
    return (sportData = JSON.parse(xhr.responseText).data);
    // console.log(sportData);
  };
  xhr.send();
};

loadData();
