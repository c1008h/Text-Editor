import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
});

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Posting data to the JATE database!');

  const jateDb = await openDB('jate', 1);

  const transaction = jateDb.transaction('jate', 'readwrite');

  const store = transaction.objectStore('jate')

  const request = store.put({ id: 1, value: content })

  const res = await request;
  // console.log(res, '\n saved to Database !');
  console.log(res.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>{
  console.log('Getting data from the JATE database!');

  const jateDb = await openDB('jate', 1);

  const transaction = jateDb.transaction('jate', 'readonly');

  const store = transaction.objectStore('jate');

  const request = store.get(1);

  const res = await request;

  console.log(`\tRESPONSE\n\t----------`, res);

  return res?.value;
};

initdb();