import { db } from "../../libs/db.js"

export const createPlaylist = async (req , res)=>{
try {
    const {name , description} = req.body
    const userId = req.user.id
     const existPlaylist = await db.playlist.findFirst({
            where: {
                name,
                userId
            }
        });

        if (existPlaylist) {
            return res.status(400).json({
                error: "Playlist already exists"
            });
        }

    const playlist = await db.playlist.create({
        data : {
            name ,
            description,
            userId
        }
    })

    res.status(200).json({
        success : true,
        message : " playlist create successfully",
        playlist
    })


} catch (error) {
    console.error("failed to create playlist" , error)
    res.status(500).json({
        error : "failed to create playlist"
    })
}
}

export const getAllListDetails = async (req ,res)=>{

    try {
        
        const playlists = await db.playlist.findMany({
            where : {
                userId : req.user.id
            },
            include : {
                problems : {
                    include :{
                        problem : true
                    }
                }
            }
        })

        res.status(200).json({
            success : true,
            message : "playlist fetch successfully",
            playlists
        })

    } catch (error) {
        console.error("failed to fetch playlist" , error)
        res.status(500).json({
            error :"failed to fetch playlist" 
        })
    }

}

export const getPlaylistDetails = async (req , res )=>{

}



export const addProblemToPlaylist = async (req ,res)=>{


}

export const deletePlaylist = async (req , res) =>{

}

export const removeProblemFromPlaylist = async (req ,res)=>{

}