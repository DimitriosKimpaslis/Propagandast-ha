import supabase from "../route/Client"

export const getProfileImage = async (email) => {
    const {data, error} = await supabase
        .from('writers')
        .select('image')
        .eq('email', email)
        .single()
    if (error) {
        console.log(error)
    }
    return data
}