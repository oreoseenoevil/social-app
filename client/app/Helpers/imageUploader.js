export const checkImage = (file) => {
  let err = ''
  if (!file) {
    err = 'File doesn\'t exist.'
  }

  if (file.size > 1024 * 1024) {
    err = 'File size is too large, max 1mb.'
  }

  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    err = 'File format is incorrect.'
  }

  return err
}

export const imageUpload = async (images) => {
  let imageArray = []
  for (const item of images) {
    const formData = new FormData()
    formData.append('file', item)

    formData.append('upload_preset', 'uzzxlcsa')
    formData.append('cloud_name', 'oreoseenoevil')

    const res = await fetch('https://api.cloudinary.com/v1_1/oreoseenoevil/image/upload', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()
    imageArray.push({public_id: data.public_id, url: data.secure_url})
  }

  return imageArray
} 
