enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type HTTPOptions = {
  data?: RequestData
  headers?: {[key: string]: string}
  timeout?: number
}

type RequestOptions = HTTPOptions & {method: keyof typeof METHODS}

type SimpleObj = {[key: string]: string | number | boolean}

type SendingData = Document | XMLHttpRequestBodyInit | null | undefined | object

type RequestData = SendingData | object

function isSimpleObject(o: unknown): o is SimpleObj {
  if (typeof o !== 'object' || !o) {
    return false
  }
  for (const value of Object.values(o)) {
    const t = typeof value
    if (!['string', 'boolean', 'number'].includes(t)) {
      return false
    }
  }
  return true
}

function queryStringify(data: RequestData) {
  if (!isSimpleObject(data)) {
    throw new Error('Data must be object')
  }
  const entries = data ? Object.entries(data) : []
  if (!entries.length) {
    return ''
  }
  return entries
    .reduce((acc, cur) => `${acc}${cur[0]}=${cur[1]}&`, '?')
    .slice(0, -1)
}

export class HTTPTransport {
  get = (url: string, options: HTTPOptions) => {
    url += queryStringify(options.data)
    return this.request(url, {method: METHODS.GET}, options.timeout)
  }

  put = (url: string, options: HTTPOptions) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout)
  }

  post = (url: string, options: HTTPOptions) => {
    return this.request(
      url,
      {...options, method: METHODS.POST},
      options.timeout,
    )
  }

  delete = (url: string, options: HTTPOptions) => {
    return this.request(
      url,
      {...options, method: METHODS.POST},
      options.timeout,
    )
  }

  request(
    url: string,
    options: RequestOptions = {method: METHODS.GET},
    timeout: number = 5000,
  ) {
    const {method, data} = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)
      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.timeout = timeout

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (method === METHODS.GET || !data) {
        xhr.send()
      } else {
        let body: SendingData
        if (typeof data === 'object') {
          body = JSON.stringify(data)
        } else {
          body = data
        }
        xhr.send(body)
      }
    })
  }
}
