const { v4: uuidv4 } = require("uuid");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  uploadString,
  getDownloadURL,
  ref,
} = require("firebase/storage");
const {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
  orderBy,
  getDoc,
  deleteDoc,
} = require("firebase/firestore");
const { firebaseConfig } = require("./config");

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);
const db = getFirestore(firebase);

//////////////////////////////////
// FIRESTORAGE
//////////////////////////////////
const uploadFile = async (file) => {
  const metadata = {
    contentType: "text/html",
  };
  const id = uuidv4();
  const storageRef = ref(storage, `/templates/${id}.html`);
  const snapshot = await uploadString(storageRef, file, "raw", metadata);
  const url = await getDownloadURL(snapshot.ref);
  return { url, id };
};

//////////////////////////////////
// FIRESTORE
//////////////////////////////////
const saveFileUrlToDatabase = async (id, name, FileUrl, type) => {
  await setDoc(doc(db, "templates", id), {
    id,
    url: FileUrl,
    type,
    name,
    createdAt: serverTimestamp(),
  });
};

const listFiles = async () => {
  let data = [];
  const querySnapshot = await getDocs(
    collection(db, "templates"),
    orderBy("createdAt", "asc")
  );
  querySnapshot.forEach((doc) => {
    data = [...data, doc.data()];
  });

  return data;
};

const getQuestionById = async (id) => {
  const docRef = doc(db, "templates", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { status: 200, question: docSnap.data() };
  } else {
    return { status: 404, question: "Not Found" };
  }
};

const deleteQuestionById = async (id) => {
  try {
    await deleteDoc(doc(db, "templates", id));
    return {
      status: 200,
      question: "question deleted !",
    };
  } catch (error) {
    return {
      status: 400,
      question: "question didn't deleted !",
    };
  }
};

module.exports = {
  uploadFile,
  saveFileUrlToDatabase,
  listFiles,
  getQuestionById,
  deleteQuestionById,
};
