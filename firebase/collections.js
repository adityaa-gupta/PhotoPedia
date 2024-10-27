import db from "./config";
import { collection } from "firebase/firestore";

export const Events = collection(db, "Events");