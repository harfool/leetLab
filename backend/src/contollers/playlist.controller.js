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



export const addProblemToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body; // Accept an array of problem IDs

  try {
    // Ensure problemIds is an array
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ error: "Invalid or missing problemIds" });
    }

    console.log(
      problemIds.map((problemId) => ({
        playlistId,
        problemId,
      }))
    );

    // Create records for each problem in the playlist
    const problemsInPlaylist = await db.problemInPlaylist.createMany({
      data: problemIds.map((problemId) => ({
        playListId: playlistId, // ✅ match your Prisma field name exactly
        problemId,
      })),
    });

    res.status(201).json({
      success: true,
      message: "Problems added to playlist successfully",
      problemsInPlaylist,
    });
  } catch (error) {
    console.error("Error adding problems to playlist:", error.message);
    res.status(500).json({ error: "Failed to add problems to playlist" });
  }
};


export const deletePlaylist = async (req, res) => {
    const { playListId } = req.params;

    // Check if playListId is provided
    if (!playListId) {
        return res.status(400).json({
            error: "Playlist ID is required",
        });
    }

    try {
        const deletedPlaylist = await db.playlist.delete({
            where: {
                id: playListId,
            },
        });

        res.status(200).json({
            success: true,
            message: "Playlist deleted successfully",
            deletedPlaylist,
        });

    } catch (error) {
        console.error("Error while deleting playlist", error);

        res.status(500).json({
            success: false,
            error: "Error while deleting playlist",
        });
    }
};


export const removeProblemFromPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ error: "Invalid or missing problemIds" });
    }
    // Only delete given problemIds not all

    const deletedProblem = await db.problemInPlaylist.deleteMany({
      where: {
        id : playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Problem removed from playlist successfully",
      deletedProblem,
    });
  } catch (error) {
    console.error("Error removing problem from playlist:", error.message);
    res.status(500).json({ error: "Failed to remove problem from playlist" });
  }
};