function signIn(){
    let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth"

    let form = document.createElement('form')
    form.setAttribute('method', 'GET')
    form.setAttribute('action', oauth2Endpoint)

    let params = {
        "client_id":"",
        "redirect_uri":"",
        "response_type":"token",
        "scope":"https://www.googleapis.com/auth/userinfo.profile",
        "include_granted_scopes":'true',
        'state':'pass-through-value'
    }
}