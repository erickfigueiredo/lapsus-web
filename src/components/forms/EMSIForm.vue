<template>
  <form @submit.prevent="submitForm" class="my-4" novalidate>
    <!-- ==========================Evento============================ -->
    <div v-show="step === 0">
      <jumbotron>
        Informações Gerais - 1/2
      </jumbotron>
      <div class="border-2 rounded-md p-4">
        <div class="sm:flex mb-4 sm:space-x-4">
          <!-- DECL DATIME -->
          <div class="w-full">
            <label for="event_decl" class="block my-2 text-gray-500 font-semibold">
              Momento da Identificação
            </label>
            <input
              id="event_decl"
              name="event_decl"
              v-model="event.decl_datime"
              type="datetime-local"
              class="form-control"
            />
          </div>
          <!-- OCC DATIME -->
          <div class="w-full">
            <label for="event_occ" class="block my-2 text-gray-500 font-semibold">
              Momento da Ocorrência
            </label>
            <input
              id="event_occ"
              name="event_occ"
              v-model="event.occ_datime"
              type="datetime-local"
              class="form-control"
            />
          </div>
        </div>
        <!-- CERTAINTY -->
        <div class="my-4">
          <label for="event_certainty" class="block my-2 text-gray-500 font-semibold">
            Probabilidade de Ocorrência: {{ event.certainty }}%
          </label>
          <input
            id="event_certainty"
            name="event_certainty"
            v-model="event.certainty"
            type="range"
            min="0"
            max="100"
            class="form-control"
          />
        </div>
        <!-- STATUS -->
        <div class="my-4">
          <label for="event_status" class="block my-2 text-gray-500 font-semibold">
            Situação do Evento:
          </label>
          <select
            id="event_status"
            name="event_status"
            v-model="event.status"
            class="form-control"
          >
            <option value="" disabled selected hidden>Selecione uma situação...</option>
            <option v-for="(status, i) in statusList" :key="i" :value="status.status">
              {{ status.desc }}
            </option>
          </select>
        </div>
        <div class="sm:flex my-4 sm:space-x-4">
          <!-- Risk Assessment -->
          <div class="w-full">
            <label for="event_risk" class="block my-2 text-gray-500 font-semibold">
              Risco
            </label>
            <select
              id="event_risk"
              name="event_risk"
              v-model="event.risk_assessmnt"
              class="form-control"
            >
              <option value="" disabled selected hidden>Selecione o risco...</option>
              <option v-for="(risk, i) in riskList" :key="i" :value="risk.risk_assessmnt">
                {{ risk.desc }}
              </option>
            </select>
          </div>
          <!-- Cause -->
          <div class="w-full">
            <label for="event_cause" class="block my-2 text-gray-500 font-semibold">
              Causa
            </label>
            <select
              id="event_cause"
              name="event_cause"
              v-model="event.cause"
              class="form-control"
            >
              <option value="" disabled selected hidden>Selecione a causa...</option>
              <option v-for="(cause, i) in causeList" :key="i" :value="cause.cause">
                {{ cause.desc }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div v-show="step === 1">
      <jumbotron>
        Informações Gerais - 2/2
      </jumbotron>
      <div class="border-2 rounded-md p-4">
        <!-- Scale -->
        <div class="mb-4">
          <label for="event_scale" class="block my-2 text-gray-500 font-semibold">
            Nível de Recurso
          </label>
          <select
            id="event_scale"
            name="event_scale"
            v-model="event.scale"
            class="form-control"
          >
            <option value="" disabled selected hidden>Selecione o nível...</option>
            <option v-for="(scale, i) in scaleList" :key="i" :value="scale.scale" class="truncate">
              {{ scale.desc }}
            </option>
          </select>
        </div>
        <!-- EVENT FreeText -->
        <div class="my-4">
          <label for="event_desc" class="block my-2 text-gray-500 font-semibold">
            Descrição
          </label>
          <textarea
            id="event_desc"
            name="event_desc"
            v-model="event.freetext"
            spellcheck="true"
            class="form-control"
          />
        </div>
        <!-- ==========================Context============================ -->
        <!-- CONTEXT Urgency -->
        <div class="my-4">
          <label for="context_urgency" class="block my-2 text-gray-500 font-semibold">
            O evento é:
          </label>
          <div id="context_urgency">
            <label for="urgent" class="my-2 text-gray-500 font-semibold">
              Urgente
              <input
                id="urgent"
                name="urgent"
                type="radio"
                value="URGENT"
                v-model="context.urgency"
                class="p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
              />
            </label>
            <label for="not_urgent" class="my-2 text-gray-500 font-semibold ml-4">
              Não Urgente
              <input
                id="not_urgent"
                name="not_urgent"
                type="radio"
                value="NOT_URGENT"
                v-model="context.urgency"
                class="p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
              />
            </label>
          </div>
        </div>
        <!-- CONTEXT Freetext -->
        <div class="my-4">
          <label for="context_desc" class="block my-2 text-gray-500 font-semibold">
            Classificação do Evento
          </label>
          <select
            id="context_desc"
            name="context_desc"
            v-model="context.freetext"
            class="w-full p-2 bg-gray-100 text-gray-600 capitalize rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
          >
            <option value="" disabled selected hidden>Selecione o Classificação...</option>
            <option
              v-for="(category, i) in categoryList"
              :key="i"
              :value="category.name"
              class="capitalize"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div v-show="step === 2">
      <!-- ==========================Egeo============================ -->
      <jumbotron>
        Informações sobre a Área - 1/2
      </jumbotron>
      <div class="border-2 rounded-md p-4">
        <!-- EGEO datime -->
        <div class="mb-4">
          <label for="egeo_time" class="block my-2 text-gray-500 font-semibold">
            Data e Hora
          </label>
          <input
            id="egeo_time"
            name="egeo_time"
            v-model="egeo.datime"
            type="datetime-local"
            class="form-control"
          />
        </div>
        <!-- EGEO FreeText -->
        <div class="my-4">
          <label for="egeo_desc" class="block my-2 text-gray-500 font-semibold">
            Descrição
          </label>
          <textarea
            id="egeo_desc"
            name="egeo_desc"
            v-model="egeo.freetext"
            spellcheck="true"
            class="form-control"
          />
        </div>
        <!-- Type -->
        <div class="sm:flex my-4 sm:space-x-4">
          <div class="w-full">
            <label for="egeo_type" class="block my-2 text-gray-500 font-semibold">
              Tipo
            </label>
            <select
              id="egeo_type"
              name="egeo_type"
              v-model="egeo.type"
              @click="egeo.subtype = ''"
              class="form-control"
            >
              <option value="" disabled selected hidden>Selecione o tipo...</option>
              <option v-for="(type, i) in typeList" :key="i" :value="i">
                {{ type.desc }}
              </option>
            </select>
          </div>
          <!-- SubType -->
          <div class="w-full">
            <label for="egeo_subtype" class="block my-2 text-gray-500 font-semibold">
              SubTipo
            </label>
            <select
              id="egeo_subtype"
              name="egeo_subtype"
              v-model="egeo.subtype"
              class="form-control"
              :disabled="!egeo.type"
            >
              <template v-if="egeo.type">
                <option value="" disabled selected hidden>Selecione o subtipo...</option>
                <option
                  v-for="(subtype, i) in typeList[egeo.type].subtype"
                  :key="i"
                  :value="subtype.subtype"
                >
                  {{ subtype.desc }}
                </option>
              </template>
              <template v-else>
                <option value="" disabled selected hidden>Selecione o subtipo...</option>
              </template>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div v-show="step === 3">
      <jumbotron>
        Informações sobre a Área - 2/2
      </jumbotron>

      <div v-if="(egeo.type && egeo.subtype) || egeo.datime || egeo.freetext">
        <!-- ==========================weathers============================ -->
        <p v-show="!fields.weathers.length" class="text-center my-4">
          Deseja adicionar informações sobre o clima?
        </p>
        <div
          v-for="(weather, i) in fields.weathers"
          :key="i"
          class="sm:flex sm:space-x-4 my-4 border-2 rounded-md p-4"
        >
          <div class="w-full">
            <label :for="`wth_${i}_type`" class="block my-2 text-gray-500 font-semibold">
              Clima
            </label>
            <select
              :id="`wth_${i}_type`"
              :name="`wth_${i}_type`"
              @click="weather.subweather = ''"
              v-model="weather.weather"
              class="form-control"
            >
              <option value="" disabled selected hidden>Selecione o tipo de local...</option>
              <option v-for="(wth, i) in weatherList" :key="i" :value="i">
                {{ wth.desc }}
              </option>
            </select>
          </div>
          <div class="w-full">
            <label :for="`wth_${i}_subtype`" class="block my-2 text-gray-500 font-semibold">
              SubClima
            </label>
            <select
              :id="`wth_${i}_subtype`"
              :name="`wth_${i}_subtype`"
              v-model="weather.subweather"
              class="form-control"
              :disabled="!weather.weather"
            >
              <template v-if="weather.weather">
                <option value="" disabled selected hidden>Selecione o subtipo...</option>
                <option
                  v-for="(s, i) in weatherList[weather.weather].subweather"
                  :key="i"
                  :value="s.subweather"
                >
                  {{ s.desc }}
                </option>
              </template>
              <template v-else>
                <option value="" disabled selected hidden>Selecione o subtipo...</option>
              </template>
            </select>
          </div>
        </div>
        <div class="flex justify-center space-x-4">
          <button
            class="p-2 rounded-md ease-in-out bg-gray-600 font-semibold
          hover:text-white text-lemon-400 hover:bg-lemon-500"
            type="button"
            @click="addWeather"
          >
            + Clima
          </button>
          <button
            class="p-2 rounded-md ease-in-out bg-gray-600 font-semibold
          hover:text-white text-lemon-400 hover:bg-red-600"
            type="button"
            @click="removeLastField('weathers')"
          >
            - Clima
          </button>
        </div>
        <hr class="my-4" />
      </div>
      <!-- ==========================LocTypes============================ -->
      <p v-show="!fields.loctypes.length" class="text-center my-4">
        Deseja adicionar informações sobre o local?
      </p>
      <div
        v-for="(loctype, i) in fields.loctypes"
        :key="i"
        class="sm:flex sm:space-x-4 my-4 border-2 rounded-md p-4"
      >
        <div class="w-full">
          <label :for="`loc_${i}_type`" class="block my-2 text-gray-500 font-semibold">
            Local
          </label>
          <select
            :id="`loc_${i}_type`"
            :name="`loc_${i}_type`"
            @click="loctype.subloctype = ''"
            v-model="loctype.loctype"
            class="form-control"
          >
            <option value="" disabled selected hidden>Selecione o tipo de local...</option>
            <option v-for="(loc, i) in loctypeList" :key="i" :value="i">
              {{ loc.desc }}
            </option>
          </select>
        </div>
        <div class="w-full">
          <label :for="`loc_${i}_subtype`" class="block my-2 text-gray-500 font-semibold">
            SubLocal
          </label>
          <select
            :id="`loc_${i}_subtype`"
            :name="`loc_${i}_subtype`"
            v-model="loctype.subloctype"
            class="form-control"
            :disabled="!loctype.loctype"
          >
            <template v-if="loctype.loctype">
              <option value="" disabled selected hidden>Selecione o subtipo...</option>
              <option
                v-for="(s, i) in loctypeList[loctype.loctype].subloctype"
                :key="i"
                :value="s.subloctype"
              >
                {{ s.desc }}
              </option>
            </template>
            <template v-else>
              <option value="" disabled selected hidden>Selecione o subtipo...</option>
            </template>
          </select>
        </div>
      </div>
      <div class="flex justify-center space-x-4">
        <button
          class="p-2 rounded-md ease-in-out bg-gray-600 font-semibold
          hover:text-white text-lemon-400 hover:bg-lemon-500"
          type="button"
          @click="addLoctypes"
        >
          + Local
        </button>
        <button
          class="p-2 rounded-md ease-in-out bg-gray-600 font-semibold
          hover:text-white text-lemon-400 hover:bg-red-600"
          type="button"
          @click="removeLastField('loctypes')"
        >
          - Local
        </button>
      </div>
    </div>
    <div v-show="step === 4">
      <!-- ==========================Actors============================ -->
      <jumbotron>
        Informações sobre as Entidades em Perigo
      </jumbotron>
      <p v-show="!fields.actors.length" class="text-center my-4">
        Deseja adicionar informações sobre as entidades?
      </p>
      <div
        v-for="(actor, i) in fields.actors"
        :key="i"
        class="sm:flex sm:space-x-4 my-4 border-2 rounded-md p-4"
      >
        <div class="w-full">
          <label :for="`act_${i}_nv1`" class="block my-2 text-gray-500 font-semibold">
            Entidade
          </label>
          <select
            :id="`act_${i}_nv1`"
            :name="`act_${i}_nv1`"
            @click="
              actor.actornv2 = '';
              actor.actornv3 = '';
            "
            v-model="actor.actor"
            class="form-control"
          >
            <option value="" disabled selected hidden>Selecione o tipo...</option>
            <option v-for="(act, i) in actorList" :key="i" :value="i">
              {{ act.desc }}
            </option>
          </select>
        </div>
        <div class="w-full">
          <label :for="`act_${i}_nv2`" class="block my-2 text-gray-500 font-semibold">
            Entidade Nível 2
          </label>
          <select
            :id="`act_${i}_nv2`"
            :name="`act_${i}_nv2`"
            @click="actor.actornv3 = ''"
            v-model="actor.actornv2"
            class="form-control"
            :disabled="!actor.actor"
          >
            <template v-if="actor.actor">
              <option value="" disabled selected hidden>Selecione o tipo...</option>
              <option v-for="(actnv2, i) in actorList[actor.actor].actornv2" :key="i" :value="i">
                {{ actnv2.desc }}
              </option>
            </template>
            <template v-else>
              <option value="" disabled selected hidden>Selecione o subtipo nível 2...</option>
            </template>
          </select>
        </div>
        <div class="w-full">
          <label :for="`act_${i}_nv3`" class="block my-2 text-gray-500 font-semibold">
            Entidade Nível 3
          </label>
          <select
            :id="`act_${i}_nv3`"
            :name="`act_${i}_nv3`"
            v-model="actor.actornv3"
            class="form-control"
            :disabled="!actor.actornv2"
          >
            <template v-if="actor.actornv2">
              <option value="" disabled selected hidden>Selecione o subtipo...</option>
              <option
                v-for="(actnv3, i) in actorList[actor.actor].actornv2[actor.actornv2].actornv3"
                :key="i"
                :value="actnv3.actornv3"
              >
                {{ actnv3.desc }}
              </option>
            </template>
            <template v-else>
              <option value="" disabled selected hidden>Selecione o subtipo nível 3...</option>
            </template>
          </select>
        </div>
      </div>
      <div class="flex justify-center space-x-4">
        <button
          class="p-2 rounded-md ease-in-out bg-gray-600 font-semibold
          hover:text-white text-lemon-400 hover:bg-lemon-500"
          type="button"
          @click="addActors"
        >
          + Entidade
        </button>
        <button
          class="p-2 rounded-md ease-in-out bg-gray-600 font-semibold
          hover:text-white text-lemon-400 hover:bg-red-600"
          type="button"
          @click="removeLastField('actors')"
        >
          - Entidade
        </button>
      </div>
    </div>
    <div v-show="step === 5">
      <!-- ==========================Evacs============================ -->
      <jumbotron>
        Informações sobre Pessoas Evacuadas
      </jumbotron>
      <p v-show="!fields.evacs.length" class="text-center my-4">
        Deseja adicionar informações sobre evacuações?
      </p>
      <div v-for="(evacs, i) in fields.evacs" :key="i" class="my-4 border-2 rounded-md p-4">
        <div class="mb-4">
          <label :for="`evacs_${i}_datime`" class="block my-2 text-gray-500 font-semibold">
            Data e Hora
          </label>
          <input
            :id="`evacs_${i}_datime`"
            :name="`evacs_${i}_datime`"
            v-model="fields.evacs[i].datime"
            type="datetime-local"
            class="form-control"
          />
        </div>
        <div class="sm:flex sm:space-x-4 my-4">
          <div class="w-full">
            <label :for="`evacs_${i}_displaced`" class="block my-2 text-gray-500 font-semibold">
              Pessoas sendo Evacuadas
            </label>
            <input
              :id="`evacs_${i}_displaced`"
              :name="`evacs_${i}_displaced`"
              v-model="fields.evacs[i].displaced"
              type="number"
              min="0"
              placeholder="Número de Pessoas"
              class="form-control"
            />
          </div>
          <div class="w-full">
            <label :for="`evacs_${i}_evacuated`" class="block my-2 text-gray-500 font-semibold">
              Pessoas Evacuadas
            </label>
            <input
              :id="`evacs_${i}_evacuated`"
              :name="`evacs_${i}_evacuated`"
              v-model="fields.evacs[i].evacuated"
              type="number"
              min="0"
              placeholder="Número de Pessoas"
              class="form-control"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-center space-x-4">
        <button
          class="p-2 rounded-md ease-in-out bg-gray-600 font-semibold
          hover:text-white text-lemon-400 hover:bg-lemon-500"
          type="button"
          @click="addEvacs"
        >
          + Evacuados
        </button>
        <button
          class="p-2 rounded-md ease-in-out bg-gray-600 font-semibold
          hover:text-white text-lemon-400 hover:bg-red-600"
          type="button"
          @click="removeLastField('evacs')"
        >
          - Evacuados
        </button>
      </div>
    </div>
    <div v-show="step === 6">
      <!-- ==========================Casualties============================ -->
      <jumbotron>
        Informações sobre Vítimas
      </jumbotron>
      <p v-show="!fields.casualties.length" class="text-center my-4">
        Deseja adicionar informações sobre vítimas?
      </p>
      <div
        v-for="(casualties, i) in fields.casualties"
        :key="i"
        class="border-2 rounded-md p-4 my-4"
      >
        <div class="mb-4">
          <label :for="`casualties_${i}_context`" class="block my-2 text-gray-500 font-semibold">
            Contexto
          </label>
          <select
            :id="`casualties_${i}_context`"
            :name="`casualties_${i}_context`"
            v-model="fields.casualties[i].context"
            class="form-control"
          >
            <option value="" disabled selected hidden>Selecione o tipo...</option>
            <option v-for="(c, i) in casualtiesList" :key="i" :value="c.context">
              {{ c.desc }}
            </option>
          </select>
        </div>
        <div class="my-4">
          <label :for="`casualties_${i}_datime`" class="block my-2 text-gray-500 font-semibold">
            Data e Hora
          </label>
          <input
            :id="`casualties_${i}_datime`"
            :name="`casualties_${i}_datime`"
            v-model="fields.casualties[i].datime"
            type="datetime-local"
            class="form-control"
          />
        </div>
        <div class="sm:flex sm:space-x-4 my-4">
          <div class="w-full">
            <label
              :for="`casualties_${i}_triagered`"
              class="block my-2 text-gray-500 font-semibold"
            >
              Estado de Extrema Urgência
            </label>
            <input
              :id="`casualties_${i}_triagered`"
              :name="`casualties_${i}_triagered`"
              v-model="fields.casualties[i].triagered"
              type="number"
              min="0"
              placeholder="Número de Pessoas"
              class="form-control"
            />
          </div>
          <div class="w-full">
            <label
              :for="`casualties_${i}_triageyellow`"
              class="block my-2 text-gray-500 font-semibold"
            >
              Estado Urgência
            </label>
            <input
              :id="`casualties_${i}_triageyellow`"
              :name="`casualties_${i}_triageyellow`"
              v-model="fields.casualties[i].triageyellow"
              type="number"
              min="0"
              placeholder="Número de Pessoas"
              class="form-control"
            />
          </div>
        </div>
        <div class="sm:flex sm:space-x-4 my-4">
          <div class="w-full">
            <label
              :for="`casualties_${i}_triagegreen`"
              class="block my-2 text-gray-500 font-semibold"
            >
              Feridos
            </label>
            <input
              :id="`casualties_${i}_triagegreen`"
              :name="`casualties_${i}_triagegreen`"
              v-model="fields.casualties[i].triagegreen"
              type="number"
              min="0"
              placeholder="Número de Pessoas"
              class="form-control"
            />
          </div>
          <div class="w-full">
            <label
              :for="`casualties_${i}_triageblack`"
              class="block my-2 text-gray-500 font-semibold"
            >
              Óbitos
            </label>
            <input
              :id="`casualties_${i}_triageblack`"
              :name="`casualties_${i}_triageblack`"
              v-model="fields.casualties[i].triageblack"
              type="number"
              min="0"
              placeholder="Número de Pessoas"
              class="form-control"
            />
          </div>
          <div class="w-full">
            <label :for="`casualties_${i}_missing`" class="block my-2 text-gray-500 font-semibold">
              Desaparecidos
            </label>
            <input
              :id="`casualties_${i}_missing`"
              :name="`casualties_${i}_missing`"
              v-model="fields.casualties[i].missing"
              type="number"
              min="0"
              placeholder="Número de Pessoas"
              class="form-control"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-center space-x-4">
        <button
          class="p-2 rounded-md ease-in-out bg-gray-600 font-semibold
          hover:text-white text-lemon-400 hover:bg-lemon-500"
          type="button"
          @click="addCasualties"
        >
          + Vítima
        </button>
        <button
          class="p-2 rounded-md ease-in-out bg-gray-600 font-semibold
          hover:text-white text-lemon-400 hover:bg-red-600"
          type="button"
          @click="removeLastField('casualties')"
        >
          - Vítima
        </button>
      </div>
    </div>
    <div v-show="step === 7">
      <jumbotron>
        Informações Complementares
      </jumbotron>
      <!-- ==========================ExternalInfo============================ -->
      <p v-show="!fields.externalInfos.length" class="text-center my-4">Deseja adicionar anexos?</p>
      <div
        v-for="(external, i) in fields.externalInfos"
        :key="i"
        class="my-4 border-2 rounded-md p-4"
      >
        <div class="mb-4">
          <label :for="`external_${i}_file`" class="block my-2 text-gray-500 font-semibold">
            Arquivo
          </label>
          <input
            :id="`external_${i}_file`"
            :name="`external_${i}_file`"
            :ref="`external_${i}`"
            type="file"
            class="form-control"
          />
        </div>
        <div class="">
          <label :for="`external_${i}_desc`" class="block my-2 text-gray-500 font-semibold">
            Descrição
          </label>
          <textarea
            :id="`external_${i}_desc`"
            :name="`external_${i}_desc`"
            v-model="fields.externalInfos[i].freetext"
            spellcheck="true"
            class="form-control"
          />
        </div>
      </div>
      <div class="flex justify-center space-x-4">
        <button
          class="p-2 rounded-md ease-in-out bg-gray-600 font-semibold
          hover:text-white text-lemon-400 hover:bg-lemon-500"
          type="button"
          @click="addExternal"
        >
          + Anexo
        </button>
        <button
          class="p-2 rounded-md ease-in-out bg-gray-600 font-semibold
          hover:text-white text-lemon-400 hover:bg-red-600"
          type="button"
          @click="removeLastField('externalInfos')"
        >
          - Anexo
        </button>
      </div>
      <hr class="my-4" />
      <!-- Se não existir nem mostra -->
      <template v-if="contributionList.length">
        <!-- Contribuição Associada -->
        <div class="my-4">
          <label for="context_desc" class="block my-2 text-gray-500 font-semibold">
            Associar a uma contribuição
          </label>
          <select
            id="contribution_assoc"
            name="contribution_assoc"
            v-model="id_contribution"
            class="form-control"
          >
            <option value="" disabled selected hidden>Selecione o risco...</option>
            <option v-for="(contribution, i) in contributionList" :key="i" :value="contribution.id">
              {{ `${contribution.id} - ${contribution.category}` }}
            </option>
          </select>
        </div>
      </template>
    </div>
    <div class="flex my-4 justify-between bg-gray-100 border-2 border-gray-300 rounded-md p-2">
      <button
        :class="
          step < 1
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-gray-600 hover:text-white text-lemon-400 hover:bg-lemon-500'
        "
        class="p-2 rounded-md ease-in-out  font-semibold"
        type="button"
        @click="stepControl(-1)"
        :disabled="step < 1"
      >
        Anterior
      </button>
      <button
        :class="
          step > 6
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-gray-600 hover:text-white text-lemon-400 hover:bg-lemon-500'
        "
        class="p-2 rounded-md ease-in-out  font-semibold"
        type="button"
        @click="stepControl(1)"
        :disabled="step > 6"
      >
        Próximo
      </button>
    </div>
    <base-button v-if="step === 7" :isBlocked="blockAction">
      Cadastrar Contribuição
    </base-button>
  </form>
</template>

<script>
import BaseButton from '../BaseButton.vue';
import Jumbotron from '../Jumbotron.vue';
import EMSI from '../../services/EMSI';

export default {
  components: {
    BaseButton,
    Jumbotron,
  },
  emits: ['form-response', 'next-action'],
  props: {
    geometry: {
      type: String,
      require: true,
    },
    categoryList: {
      type: Array,
      require: true,
    },
    causeList: {
      type: Array,
      require: true,
    },
    riskList: {
      type: Array,
      require: true,
    },
    scaleList: {
      type: Array,
      require: true,
    },
    statusList: {
      type: Array,
      require: true,
    },
    casualtiesList: {
      type: Array,
      require: true,
    },
    contributionList: {
      type: Array,
      require: true,
    },
    typeList: {
      type: Object,
      require: true,
    },
    loctypeList: {
      type: Object,
      require: true,
    },
    weatherList: {
      type: Object,
      require: true,
    },
    actorList: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      step: 0,
      blockAction: false,
      id_contribution: null,
      event: {
        certainty: null,
        decl_datime: null,
        occ_time: null,
        scale: '',
        risk_assessmnt: '',
        status: '',
        cause: '',
        freetext: '',
      },
      context: {
        urgency: '',
        freetext: '',
      },
      egeo: {
        datime: null,
        type: '',
        subtype: '',
        freetext: '',
      },
      fields: {
        actors: [],
        casualties: [],
        evacs: [],
        externalInfos: [],
        loctypes: [],
        weathers: [],
      },
    };
  },
  methods: {
    clearForm() {
      this.step = 0;

      this.event = {
        certainty: null,
        decl_datime: null,
        occ_time: null,
        scale: '',
        risk_assessmnt: '',
        status: '',
        cause: '',
        freetext: '',
      };

      this.context = {
        urgency: '',
        freetext: '',
      };

      this.egeo = {
        datime: null,
        type: '',
        subtype: '',
        freetext: '',
      };

      this.fields = {
        actors: [],
        casualties: [],
        evacs: [],
        externalInfos: [],
        loctypes: [],
        weathers: [],
      };
    },
    addActors() {
      this.fields.actors.push({
        actor: '',
        actornv2: '',
        actornv3: '',
      });
    },
    addCasualties() {
      this.fields.casualties.push({
        context: '',
        datime: null,
        triagered: null,
        triageyellow: null,
        triagegreen: null,
        triageblack: null,
        missing: null,
      });
    },
    addEvacs() {
      this.fields.evacs.push({
        datime: null,
        displaced: null,
        evacuated: null,
      });
    },
    addExternal() {
      this.fields.externalInfos.push({
        freetext: '',
      });
    },
    addLoctypes() {
      this.fields.loctypes.push({
        loctype: '',
        subloctype: '',
      });
    },
    addWeather() {
      this.fields.weathers.push({
        weather: '',
        subweather: '',
      });
    },
    removeLastField(field) {
      if (this.fields[field].length > 0) this.fields[field].pop();
    },
    stepControl(value) {
      if (value > 0 && this.step < 7) {
        this.step += 1;
      } else if (value < 0 && this.step > 0) this.step -= 1;
    },
    async submitForm() {
      this.blockAction = true;

      const data = {
        id_contribution: this.id_contribution || undefined,
        event: {
          certainty: this.event.certainty || undefined,
          decl_datime: this.event.decl_datime || undefined,
          occ_time: this.event.occ_time || undefined,
          scale: this.event.scale || undefined,
          risk_assessmnt: this.event.risk_assessmnt || undefined,
          status: this.event.status || undefined,
          cause: this.event.cause || undefined,
          freetext: this.event.freetext || undefined,
        },
        context: {
          urgency: this.context.urgency || undefined,
          freetext: this.context.freetext || undefined,
        },
        egeo: {
          datime: this.egeo.datime || undefined,
          freetext: this.egeo.freetext || undefined,
          type: this.egeo.type || undefined,
          subtype: this.egeo.subtype || undefined,
        },
      };

      if (Object.values(data.egeo).some((el) => typeof el !== 'undefined')) {
        data.position = this.geometry;

        if (this.fields.weathers.length) {
          data.weathers = this.fields.weathers.map((w) => ({
            weather: w.weather || undefined,
            subweather: w.subweather || undefined,
          }));
        }
      } else {
        delete data.egeo;
      }

      if (Object.values(data.event).every((el) => typeof el === 'undefined')) {
        delete data.event;
      }

      if (Object.values(data.context).every((el) => typeof el === 'undefined')) {
        delete data.context;
      }

      if (this.fields.actors.length) {
        data.actors = this.fields.actors.map((a) => ({
          actor: a.actor || undefined,
          actornv2: a.actornv2 || undefined,
          actornv3: a.actornv3 || undefined,
        }));
      }

      if (this.fields.casualties.length) {
        data.casualties = this.fields.casualties.map((c) => ({
          context: c.context || undefined,
          datime: c.datime || undefined,
          triagered: c.triagered || undefined,
          triageyellow: c.triageyellow || undefined,
          triagegreen: c.triagegreen || undefined,
          triageblack: c.triageblack || undefined,
          missing: c.missing || undefined,
        }));
      }

      if (this.fields.evacs.length) {
        data.evacs = this.fields.evacs.map((e) => ({
          datime: e.datime || undefined,
          displaced: e.displaced || undefined,
          evacuated: e.evacuated || undefined,
        }));
      }

      if (this.fields.loctypes.length) {
        data.loctypes = this.fields.loctypes.map((l) => ({
          loctype: l.loctype || undefined,
          subloctype: l.subloctype || undefined,
        }));
      }

      const formData = new FormData();

      for (let i = 0; i < this.fields.externalInfos.length; i += 1) {
        if (this.$refs[`external_${i}`].files[0]) {
          formData.append('file', this.$refs[`external_${i}`].files[0]);
          if (this.fields.externalInfos[i].freetext) {
            if (!data.desc_external_infos) data.desc_external_infos = [];
            data.desc_external_infos.push({
              index_file: i,
              freetext: this.fields.externalInfos[i].freetext,
            });
          }
        }
      }

      formData.append('data', JSON.stringify(data));

      const result = await EMSI.create(formData, this.$store.getters.token);
      if (result.success) {
        this.clearForm();
        this.$emit('next-action');
        this.$emit('form-response', 1, result.message);
      } else {
        this.$emit('form-response', 3, result.message);
      }

      this.blockAction = false;
    },
  },
};
</script>
