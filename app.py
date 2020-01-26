import os
import json
from functools import lru_cache
from flask import Flask, render_template, g
import pandas as pd

app = Flask(__name__)

ENV = {
    'MAPBOX_TOKEN': os.environ['MAPBOX_TOKEN'],
}


### Utils
@lru_cache
def load_data(path):
    df = pd.read_csv(path)
    df[['acq_time']] = df[['acq_time']].applymap(lambda x: f'{x:04}')

    r = {}
    for x in df.to_dict('records'):
        k = x['acq_date']
        del x['acq_date']

        r.setdefault(k, [])
        r[k] += [x]

    return r


### Routes
@app.route('/')
def root():
    return render_template('index.html', env=ENV)

@app.route('/api/frames')
def api_frames():
    data = load_data('data/fire_nrt_M6_100853.csv')
    return {'data': data}
