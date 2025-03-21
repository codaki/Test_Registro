PGDMP     7    -                 }            asistenciadcco    15.4    15.4 +    :           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ;           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            <           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            =           1262    33247    asistenciadcco    DATABASE     �   CREATE DATABASE asistenciadcco WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Netherlands.1252';
    DROP DATABASE asistenciadcco;
                postgres    false            �            1259    33289    coleccion_fotos    TABLE     �   CREATE TABLE public.coleccion_fotos (
    coleccion_id integer NOT NULL,
    ruta_carpeta text NOT NULL,
    profesor_id integer NOT NULL
);
 #   DROP TABLE public.coleccion_fotos;
       public         heap    postgres    false            �            1259    33288     coleccion_fotos_coleccion_id_seq    SEQUENCE     �   ALTER TABLE public.coleccion_fotos ALTER COLUMN coleccion_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.coleccion_fotos_coleccion_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            �            1259    33302    horario    TABLE     C  CREATE TABLE public.horario (
    horario_id integer NOT NULL,
    profesor_id integer NOT NULL,
    asignatura character varying(100) NOT NULL,
    nrc character varying(20) NOT NULL,
    edificio character varying(50) NOT NULL,
    aula character varying(20) NOT NULL,
    hora_ingreso character varying(10) NOT NULL,
    hora_finalizacion character varying(10) NOT NULL,
    clase_lunes boolean DEFAULT false,
    clase_martes boolean DEFAULT false,
    clase_miercoles boolean DEFAULT false,
    clase_jueves boolean DEFAULT false,
    clase_viernes boolean DEFAULT false
);
    DROP TABLE public.horario;
       public         heap    postgres    false            �            1259    33301    horario_horario_id_seq    SEQUENCE     �   ALTER TABLE public.horario ALTER COLUMN horario_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.horario_horario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    223            �            1259    33274    profesor    TABLE     �   CREATE TABLE public.profesor (
    profesor_id integer NOT NULL,
    usuario_id integer NOT NULL,
    email character varying(100) NOT NULL,
    docente_id character varying(20) NOT NULL
);
    DROP TABLE public.profesor;
       public         heap    postgres    false            �            1259    33273    profesor_profesor_id_seq    SEQUENCE     �   ALTER TABLE public.profesor ALTER COLUMN profesor_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profesor_profesor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    33318    registro    TABLE       CREATE TABLE public.registro (
    registro_id integer NOT NULL,
    profesor_id integer NOT NULL,
    hora time without time zone NOT NULL,
    dia date NOT NULL,
    lugar character varying(100) NOT NULL,
    bool_inicio boolean DEFAULT false,
    tarde boolean DEFAULT false
);
    DROP TABLE public.registro;
       public         heap    postgres    false            �            1259    33317    registro_registro_id_seq    SEQUENCE     �   ALTER TABLE public.registro ALTER COLUMN registro_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.registro_registro_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    225            �            1259    33249    rol    TABLE     �   CREATE TABLE public.rol (
    rol_id integer NOT NULL,
    rol_nombre character varying(50) NOT NULL,
    rol_permiso text NOT NULL
);
    DROP TABLE public.rol;
       public         heap    postgres    false            �            1259    33248    rol_rol_id_seq    SEQUENCE     �   ALTER TABLE public.rol ALTER COLUMN rol_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rol_rol_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �            1259    33257    usuario    TABLE     �  CREATE TABLE public.usuario (
    usuario_id integer NOT NULL,
    cedula character varying(20) NOT NULL,
    username character varying(50) NOT NULL,
    userpassword character varying(255),
    nombre1 character varying(50) NOT NULL,
    nombre2 character varying(50),
    apellido1 character varying(50) NOT NULL,
    apellido2 character varying(50),
    rol_id integer NOT NULL
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    33256    usuario_usuario_id_seq    SEQUENCE     �   ALTER TABLE public.usuario ALTER COLUMN usuario_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuario_usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            3          0    33289    coleccion_fotos 
   TABLE DATA           R   COPY public.coleccion_fotos (coleccion_id, ruta_carpeta, profesor_id) FROM stdin;
    public          postgres    false    221   i5       5          0    33302    horario 
   TABLE DATA           �   COPY public.horario (horario_id, profesor_id, asignatura, nrc, edificio, aula, hora_ingreso, hora_finalizacion, clase_lunes, clase_martes, clase_miercoles, clase_jueves, clase_viernes) FROM stdin;
    public          postgres    false    223   �5       1          0    33274    profesor 
   TABLE DATA           N   COPY public.profesor (profesor_id, usuario_id, email, docente_id) FROM stdin;
    public          postgres    false    219   �5       7          0    33318    registro 
   TABLE DATA           b   COPY public.registro (registro_id, profesor_id, hora, dia, lugar, bool_inicio, tarde) FROM stdin;
    public          postgres    false    225   �5       -          0    33249    rol 
   TABLE DATA           >   COPY public.rol (rol_id, rol_nombre, rol_permiso) FROM stdin;
    public          postgres    false    215   �5       /          0    33257    usuario 
   TABLE DATA           }   COPY public.usuario (usuario_id, cedula, username, userpassword, nombre1, nombre2, apellido1, apellido2, rol_id) FROM stdin;
    public          postgres    false    217   �5       >           0    0     coleccion_fotos_coleccion_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.coleccion_fotos_coleccion_id_seq', 1, false);
          public          postgres    false    220            ?           0    0    horario_horario_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.horario_horario_id_seq', 1, false);
          public          postgres    false    222            @           0    0    profesor_profesor_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.profesor_profesor_id_seq', 1, false);
          public          postgres    false    218            A           0    0    registro_registro_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.registro_registro_id_seq', 1, false);
          public          postgres    false    224            B           0    0    rol_rol_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.rol_rol_id_seq', 1, false);
          public          postgres    false    214            C           0    0    usuario_usuario_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.usuario_usuario_id_seq', 1, false);
          public          postgres    false    216            �           2606    33295 $   coleccion_fotos coleccion_fotos_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.coleccion_fotos
    ADD CONSTRAINT coleccion_fotos_pkey PRIMARY KEY (coleccion_id);
 N   ALTER TABLE ONLY public.coleccion_fotos DROP CONSTRAINT coleccion_fotos_pkey;
       public            postgres    false    221            �           2606    33311    horario horario_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.horario
    ADD CONSTRAINT horario_pkey PRIMARY KEY (horario_id);
 >   ALTER TABLE ONLY public.horario DROP CONSTRAINT horario_pkey;
       public            postgres    false    223            �           2606    33282     profesor profesor_docente_id_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.profesor
    ADD CONSTRAINT profesor_docente_id_key UNIQUE (docente_id);
 J   ALTER TABLE ONLY public.profesor DROP CONSTRAINT profesor_docente_id_key;
       public            postgres    false    219            �           2606    33280    profesor profesor_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.profesor
    ADD CONSTRAINT profesor_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.profesor DROP CONSTRAINT profesor_email_key;
       public            postgres    false    219            �           2606    33278    profesor profesor_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.profesor
    ADD CONSTRAINT profesor_pkey PRIMARY KEY (profesor_id);
 @   ALTER TABLE ONLY public.profesor DROP CONSTRAINT profesor_pkey;
       public            postgres    false    219            �           2606    33324    registro registro_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.registro
    ADD CONSTRAINT registro_pkey PRIMARY KEY (registro_id);
 @   ALTER TABLE ONLY public.registro DROP CONSTRAINT registro_pkey;
       public            postgres    false    225            �           2606    33255    rol rol_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (rol_id);
 6   ALTER TABLE ONLY public.rol DROP CONSTRAINT rol_pkey;
       public            postgres    false    215            �           2606    33265    usuario usuario_cedula_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_cedula_key UNIQUE (cedula);
 D   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_cedula_key;
       public            postgres    false    217            �           2606    33263    usuario usuario_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (usuario_id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    217            �           2606    33267    usuario usuario_username_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_username_key UNIQUE (username);
 F   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_username_key;
       public            postgres    false    217            �           2606    33296     coleccion_fotos fk_profesor_foto    FK CONSTRAINT     �   ALTER TABLE ONLY public.coleccion_fotos
    ADD CONSTRAINT fk_profesor_foto FOREIGN KEY (profesor_id) REFERENCES public.profesor(profesor_id);
 J   ALTER TABLE ONLY public.coleccion_fotos DROP CONSTRAINT fk_profesor_foto;
       public          postgres    false    219    3218    221            �           2606    33312    horario fk_profesor_horario    FK CONSTRAINT     �   ALTER TABLE ONLY public.horario
    ADD CONSTRAINT fk_profesor_horario FOREIGN KEY (profesor_id) REFERENCES public.profesor(profesor_id);
 E   ALTER TABLE ONLY public.horario DROP CONSTRAINT fk_profesor_horario;
       public          postgres    false    219    3218    223            �           2606    33325    registro fk_profesor_registro    FK CONSTRAINT     �   ALTER TABLE ONLY public.registro
    ADD CONSTRAINT fk_profesor_registro FOREIGN KEY (profesor_id) REFERENCES public.profesor(profesor_id);
 G   ALTER TABLE ONLY public.registro DROP CONSTRAINT fk_profesor_registro;
       public          postgres    false    225    3218    219            �           2606    33268    usuario fk_rol    FK CONSTRAINT     n   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT fk_rol FOREIGN KEY (rol_id) REFERENCES public.rol(rol_id);
 8   ALTER TABLE ONLY public.usuario DROP CONSTRAINT fk_rol;
       public          postgres    false    3206    217    215            �           2606    33283    profesor fk_usuario    FK CONSTRAINT        ALTER TABLE ONLY public.profesor
    ADD CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id);
 =   ALTER TABLE ONLY public.profesor DROP CONSTRAINT fk_usuario;
       public          postgres    false    3210    217    219            3      x������ � �      5      x������ � �      1      x������ � �      7      x������ � �      -      x������ � �      /      x������ � �     