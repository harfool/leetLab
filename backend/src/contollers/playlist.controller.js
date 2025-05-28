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
            message : "playlists fetch successfully",
            playlists
        })

    } catch (error) {
        console.error("failed to fetch playlists" , error)
        res.status(500).json({
            error :"failed to fetch playlists" 
        })
    }

}

export const getPlaylistDetails = async (req , res )=>{
try {
    const {playlistId} = req.params
    const playlist = await db.playlist.findUnique({
        where : {
            id : playlistId,
            userId : req.user.id
        }, 
        include : {
            problems :{
                include :{
                    problem : true
                }
            }
        }
    })

    if (!playlist) {
        res.status(404).json({
            error : " playlist not found"
        })
    }

    res.status(200).json({
        success : true,
        message : "playlist fetch successfully ",
        playlist
    })

} catch (error) {
    console.error("failed to fetch playlist " , error)
    res.stats(500).json({
        error : "failed to fetch playlist "
    })
}
}



export const addProblemToPlaylist = async (req ,res)=>{


}

export const deletePlaylist = async (req , res) =>{

}

export const removeProblemFromPlaylist = async (req ,res)=>{

}