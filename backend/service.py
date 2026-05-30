from typing import Optional

with open("words_alpha.txt") as f:
    WORDS = set(word.strip().lower() for word in f)

def validate_word(word: str, last_word: Optional[str], used_words: set) -> dict:
    if word not in WORDS:
        return {"valid": False, "reason": "invalid_word"}
    elif word in used_words:
        return {"valid": False, "reason": "already_used"}
    elif last_word is not None and word[0] != last_word[-1]:
        return {"valid": False, "reason": "wrong_starting_letter"}
    else:
        return {"valid": True}