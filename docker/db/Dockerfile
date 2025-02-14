FROM postgres:16
COPY ./docker/db/pg_hba.conf /var/lib/postgresql/data/pg_hba.conf
COPY ./docker/db/postgresql.conf /var/lib/postgresql/data/postgresql.conf
#COPY ./docker/db/init /docker-entrypoint-initdb.d
#RUN chmod -R +x /docker-entrypoint-initdb.d