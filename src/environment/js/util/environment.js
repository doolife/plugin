const environment = (href = location.href) => {     // test() method 는 문자열이 맞는지 true/false 리턴
    if (/localhost/i.test(href)) {                      // localhost 가 있을 경우(/i flag 는 대소문자를 구분하지 않음)
        return "local";
    }
    if (/local|opdev-/i.test(href)) {                   // local 또는 opdev- 가 있을 경우
        return "op";
    }
    if (/rc\./i.test(href) || /rc-/i.test(href)) {      // rc. 또는 rc- 가 있을 경우(특수문자가 있을경우 특수문자 앞에 \ 를 붙인다)
        return "rc";
    }
    return "live";
};

export default environment;