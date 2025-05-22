import axios from 'axios';
export const actionContact = (data,callback,callbackError) => {
  return async (dispatch) => {
    try {
        data = {
            "name": data.name,
            "phone_number": data.phone,
            "subject": data.subject,
            "message": data.message,
          }
      const response = await axios.post('https://bvmailcenter.com:8000/user/contact',data, {
        headers: {
    
          Accept: 'application/json',
        }
      });

      callback()
    } catch (error) {
        callbackError()
    }
  };
};
