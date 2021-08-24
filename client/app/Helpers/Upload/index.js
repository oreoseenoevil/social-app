export const checkImage = file => {
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

export const imageUpload = async images => {
  let imageArray = []
  for (const item of images) {
    const formData = new FormData()

    if (item.camera) {
      formData.append('file', item.camera)
    } else {
      formData.append('file', item)
    }

    formData.append('upload_preset', process.env.CLOUD_PRESET)
    formData.append('cloud_name', process.env.CLOUD_NAME)

    const res = await fetch(process.env.CLOUD_API_BASE_URL, {
      method: 'POST',
      body: formData
    })

    const data = await res.json()
    imageArray.push({ public_id: data.public_id, url: data.secure_url })
  }

  return imageArray
}
