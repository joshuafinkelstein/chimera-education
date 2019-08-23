import numpy as np
import os
import datetime as dt


wd = '/Users/nikolasbaya/Documents/chimera-repo-050319/dataextraction/downloaded_transcripts'


next(os.walk('.'))[1]

subdir_ls = [(x[0],x[2]) for x in os.walk(wd) if len(x[2])>0] #only get directories with files

# Create data structures for searching
def clean(string):
    string = string.lower()
    bad_char =['.',',','--','?']
    for char in bad_char:
        string = string.replace(char, '')
    return string

def remove_junk_words(string):
    word_ls = [word for word in string.lower().split(' ') if len(word)>0]
    bad_words = {'the','of','at'}
    return ' '.join(list(set(word_ls).difference(bad_words)))
    
#words, cts = list(word_ct_dict.keys()), list(word_ct_dict.values())
#np.asarray(words)[np.argsort(cts)][::-1].tolist()[:100]

#part 0: Create dict of files
file_name_ls = []
file_content_ls = []
for i, subdir in enumerate(subdir_ls):
    print(str(i+1)+' of '+str(len(subdir_ls)))
    subdir_path, subdir_files = subdir[0], subdir[1]
    file_name_ls += subdir_files
    for f in subdir_files:
        vtt0 = open(subdir_path+"/"+f, "r").read()
        vtt1 = vtt0.split('\n\n')
        file_content_ls.append(vtt1)

file_content_dict = dict(zip(file_name_ls,file_content_ls))

#part 1: create corpus of words 
    
vtt_ls = []
word_set = {}
file_text_dict = dict(zip(file_name_ls, ['']*len(file_name_ls)))

for i,f in enumerate(file_name_ls):
#    if i>2:
#        break
    print(f'{i+1} of {len(file_name_ls)}')
    vtt1 = file_content_dict[f]
    if vtt1 != ['']:
        vtt2 = [[tuple(x.split('\n')[0].split(' --> ')),
                 ' '.join(x.split('\n')[1:]).lower()] for x in vtt1 if len(x)>0]
        word_ls_tmp = [clean(' '.join(x.split('\n')[1:])) for x in vtt1 if len(x)>0]
        file_text =  ' '.join(word_ls_tmp) 
        file_text_dict[f] = file_text
        word_ls_tmp = file_text.split(' ')
        word_ls_tmp = [x.strip(' ') for x in word_ls_tmp if x.count(':')==0]
        word_set_tmp = set(word_ls_tmp)
        if len(word_set)==0:
            word_set = word_set_tmp
        else:
            word_set = word_set.union(word_set_tmp)
    else:
        vtt2 = None
    if vtt2 != None:
        vtt2.insert(0,f.lower())
        vtt_ls.append(vtt2)

assert len(set(file_name_ls))==len(file_name_ls), 'There are overlapping video names!'


#part 2: count words and link words to files
word_ls = list(word_set)
word_ct_dict = dict(zip(word_ls,[0]*len(word_ls)))

word_file_dict = dict(zip(word_ls,[[]]*len(word_ls)))

for i,f in enumerate(file_name_ls):
#    if i>2:
#        break
    print(f'{i+1} of {len(file_name_ls)}')
#    print(f)
    
    file_text = file_text_dict[f]
    word_ls_tmp = list(set(file_text.split(' ')))
    word_ls_tmp = [x.strip(' ') for x in word_ls_tmp if x.count(':')==0]
    for j,word in enumerate(word_ls_tmp):
        word_ct_dict[word] += file_text.count(word)
        word_file_dict[word] = word_file_dict[word] + [f]

vtt_dict = dict(zip([vtt[0].lower() for vtt in vtt_ls],[vtt[2:] for vtt in vtt_ls]))


#part 3: define search function
def do_search(search_str, in_title_score = 1000, in_text_score = 1):
    start = dt.datetime.now()
    search_ls = list(set(remove_junk_words(search_str).strip(' ').split(' ')))
    
    if search_ls == ['']:
        print('ERROR: Choose better search terms')
        return None, None
    
    video_scores = dict(zip([f.lower() for f in file_name_ls],[0]*len(vtt_ls)))
    tstamps = dict(zip([f.lower() for f in file_name_ls],[[]]*len(vtt_ls)))
    
    match_text_ct = 0
    
    file_match_ls = []

    for word in search_ls:
        try:
            file_ls_tmp = [f.lower() for f in word_file_dict[word]]
            file_match_ls += file_ls_tmp
            match_text_ct += word_ct_dict[word]
            if len(file_ls_tmp) > 0:
                for f in file_ls_tmp:
                    if word in f:
                        video_scores[f] += in_title_score
                    for vtt_text in vtt_dict[f]:
                        if word in vtt_text[1]:
                            video_scores[f] += in_text_score
                            tstamps[f] = tstamps[f] + [vtt_text[0]]
        except KeyError:
            file_ls_tmp = []
    file_match_ls = list(set(file_match_ls))
    n_results = len(file_match_ls)
    if n_results:
        results = dict((file,video_scores[file]) for file in file_match_ls)
        files, scores = file_match_ls, [video_scores[file] for file in file_match_ls]
        scores_idx = np.argsort(scores)
        
        n_top_results = 5 #number of results to show
        top_results = np.asarray(files)[scores_idx][::-1][:min(n_results,n_top_results)].tolist()
        print(f'\nTop {min(n_results, n_top_results)} results ({n_results} total results):')
        for result in top_results:
            print(f'\n\n{result}\n\t{tstamps[result][:5]}') #limit tstamps results?
    else:
        results = None
        print('No results')
            
    print('\nTime for search: '+str((dt.datetime.now()-start).total_seconds()) +' sec')
    print(f'Number of total results: {n_results}')
    print(f'Number of text occurrences: {match_text_ct}')
    
    return results, tstamps

#part 4: test out search

search_str = 'symmetry'

results, tstamps = do_search(search_str)





