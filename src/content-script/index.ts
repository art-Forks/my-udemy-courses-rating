import axios from "axios";

const createInterval = () => {
    let intervalId = setInterval(() => {
        if (document.getElementsByClassName("card--learning__image").length > 0) {
            const urls = Array.from(document.getElementsByClassName("card--learning__image"));

            urls.forEach((url, index) => {
                setTimeout(() => {
                    let redirectUrl = (<HTMLLinkElement>url).href;
                    let regex = /course_id=(.+)/gm;
                    let match = regex.exec(redirectUrl);

                    const regexRules: { [index: string]: any } = {
                        score: {
                            word: '星',
                            keyword: 'data-purpose="rating-number">',
                            pattern: /data-purpose="rating-number">(.*)<\/span><svg/gm
                        },
                        count: {
                            word: '個評等',
                            keyword: '個評等',
                            pattern: / \((.*) 個評等\)/gm
                        },
                        student: {
                            word: '位學生',
                            keyword: 'data-purpose="enrollment" class="">',
                            pattern: /data-purpose="enrollment" class="">\n(.*) 位學生/gm
                        }
                    }


                    function appendMessage(message: any[]) {
                        if (message.length > 0) {
                            const appendMessage = message.join(' ')
                            document.getElementsByClassName("card--learning__details")[index].getElementsByClassName("details__start-course")[0]?.insertAdjacentText("beforeend", ` - ${appendMessage}`);
                            document.getElementsByClassName("card--learning__details")[index].getElementsByClassName("ellipsis")[0]?.insertAdjacentText("beforeend", ` - ${appendMessage}`);
                        }
                    }

                    function prepareMessage(regexRules: { [p: string]: any }, context: string) {
                        let result = []
                        for (const key in regexRules) {
                            let pattern = context.includes(regexRules[key].keyword) ? regexRules[key].pattern : null
                            let match = pattern ? pattern.exec(context) : null
                            if (match !== null) result.push(`${match[1].trim()}${regexRules[key].word}`)
                        }
                        return result;
                    }

                    if (match !== null) {
                        let targetUrl = `https://www.udemy.com/course/${match[1]}`
                        axios.get(targetUrl).then((res) => {
                            if (res.request.responseURL) {
                                axios
                                    .get(res.request.responseURL)
                                    .then(res => appendMessage(prepareMessage(regexRules, res.data)))
                            }
                        });
                    }
                }, index * 100);
            });
            clearInterval(intervalId);
        }
    }, 500);
};
createInterval();
