 Chain of Thought here significantly increases the time to
        # answer, we can get most of the way there but just having the model evaluate each individual condition with
        # a single True/False.
        # cot_block = (
        #    f"{THOUGHT_PAT} Use this as a scratchpad to write out in a step by step manner your reasoning "
        #    f"about EACH criterion to ensure that your conclusion is correct. "
        #    f"Be brief when evaluating each condition.\n"
        #    f"{FINAL_ANSWER_PAT} Valid or Invalid"
        # )