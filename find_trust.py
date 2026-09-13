import json

transcript_path = "/Users/abuzar/.gemini/antigravity/brain/09c10a6a-7afa-419c-9360-153d9411bbc0/.system_generated/logs/transcript_full.jsonl"

entries = []
with open(transcript_path) as f:
    for line in f:
        try:
            data = json.loads(line)
            entries.append(data)
        except:
            pass

# Step 355 - what was the TARGET content (what was removed)?
for data in entries:
    step = data.get("step_index")
    if step == 355 and data.get("type") == "PLANNER_RESPONSE":
        for call in data.get("tool_calls",[]):
            if call["name"] in ["replace_file_content","multi_replace_file_content"]:
                target = call["args"].get("TargetFile","")
                if "index.html" in target:
                    tc = call["args"].get("TargetContent","")
                    rc = call["args"].get("ReplacementContent","")
                    print("TARGET (what was there before):")
                    print(tc[:3000])
                    print()
                    print("REPLACEMENT (what was put in):")
                    print(rc[:3000])

# Also look for the "remove this trust bar" action at step 366-370
for data in entries:
    step = data.get("step_index")
    if step and 366 <= step <= 375:
        t = data.get("type","")
        if t == "PLANNER_RESPONSE":
            for call in data.get("tool_calls",[]):
                if call["name"] in ["replace_file_content","multi_replace_file_content"]:
                    target = call["args"].get("TargetFile","")
                    if "index.html" in target:
                        tc = call["args"].get("TargetContent","")
                        rc = call["args"].get("ReplacementContent","")
                        print(f"Step {step} - TARGET:")
                        print(tc[:2000])
                        print(f"Step {step} - REPLACEMENT:")
                        print(rc[:2000])
                        print("---")
