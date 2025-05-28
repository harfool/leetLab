import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { addProblemToPlaylist, createPlaylist, deletePlaylist, getAllListDetails, getPlaylistDetails, removeProblemFromPlaylist } from "../contollers/playlist.controller.js"

 const playlistRoute = express.Router()

 playlistRoute.get("/", authMiddleware , getAllListDetails)

 playlistRoute.get("/:playlistId" , authMiddleware , getPlaylistDetails)

 playlistRoute.post("/create-playlist" , authMiddleware , createPlaylist)

 playlistRoute.post("/:playlistId/add-problems" , authMiddleware , addProblemToPlaylist)

 playlistRoute.delete("/:playListId/delete-playlist" , authMiddleware , deletePlaylist)

 playlistRoute.delete("/:playlistId/remove-problem" , authMiddleware , removeProblemFromPlaylist)

export default playlistRoute