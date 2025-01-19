import specieController from "./specie"
import raceController from "./race"
import sexController from "./sex"
import petController from "./pet"
import vaccineController from "./vaccine"
import vaccinationController from "./vaccination"

import userController from "./user"
import badgeController from "./badge";
import notificationController from "./notification";
import typeNotificationController from "./typeNotification";

import proposalController from "./proposal";
import typeController from "./type";
import planificationController from "./planification";


import forumController from "./forum";
import topicController from "./topic";
import postController from "./post";

import serviceController from "./service";

import requestController from "./request";

import reservationController from "./reservation";
import memoryController from "./memory";

export const API = {
    //forum
    forums: forumController,
    topics: topicController,
    posts: postController,

    //user
    users: userController,

    badges: badgeController,

    typesNotifications: typeNotificationController,
    notifications: notificationController,

    //pet
    pets: petController,
    species: specieController,
    races: raceController,
    sexes: sexController,

    vaccines: vaccineController,
    vaccinations: vaccinationController,


    //proposal
    proposals: proposalController,
    types: typeController,
    planifications: planificationController,

    //Service
    services: serviceController,
    //request
    requests: requestController,

    //reservation
    reservations: reservationController,
    memories: memoryController,
};